import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { FiSearch, FiX, FiClock, FiTrendingUp } from 'react-icons/fi'
import PageBase from '../../components/PageBase/PageBase'
import AnimeCard from '../../components/AnimeCard/AnimeCard'
import { searchAnime } from '../../services/animeService'
import { type Anime } from '../../services/animeService'

import {
  SearchContainer,
  AnimationContainer,
  DotGrid,
  FloatingShape,
  SearchTitle,
  SearchDescription,
  RecentSearchesContainer,
  SearchTag,
  ResultsContainer,
  SearchInputWrapper,
  EmptyStateContainer,
  LoadingContainer,
} from './SearchPage.styles'
import { useNavigation } from '../../hooks/useNavigation'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Anime[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const { goTo } = useNavigation()

  useEffect(() => {
    const savedSearches = localStorage.getItem('anime-recent-searches')
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const saveToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      )
      const updated = [query, ...filtered].slice(0, 10)
      localStorage.setItem('anime-recent-searches', JSON.stringify(updated))
      return updated
    })
  }, [])

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const results = await searchAnime(query)
        setSearchResults(results)

        if (results.length > 0) {
          saveToRecentSearches(query)
        }
      } catch (err) {
        setError('Failed to search anime. Please try again.')
        console.error('Search error:', err)
      } finally {
        setLoading(false)
        setIsTyping(false)
      }
    },
    [saveToRecentSearches],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchQuery(value)
      setIsTyping(true)

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      if (value.trim()) {
        debounceTimer.current = setTimeout(() => {
          handleSearch(value)
        }, 500)
      } else {
        setSearchResults([])
        setIsTyping(false)
      }
    },
    [handleSearch],
  )

  const handleManualSearch = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    handleSearch(searchQuery)
  }, [searchQuery, handleSearch])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleManualSearch()
      }
    },
    [handleManualSearch],
  )

  const handleClearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults([])
    setError(null)
    setIsTyping(false)
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
  }, [])

  const handleRecentSearchClick = useCallback(
    (query: string) => {
      setSearchQuery(query)
      handleSearch(query)
    },
    [handleSearch],
  )

  const handleRemoveRecentSearch = useCallback(
    (query: string, e: React.MouseEvent) => {
      e.stopPropagation()
      setRecentSearches((prev) => {
        const updated = prev.filter((item) => item !== query)
        localStorage.setItem('anime-recent-searches', JSON.stringify(updated))
        return updated
      })
    },
    [],
  )

  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([])
    localStorage.removeItem('anime-recent-searches')
  }, [])

  const convertAnimeToCardProps = useCallback(
    (anime: Anime) => {
      return {
        image: anime.imageUrl,
        imageAlt: anime.title,
        title: anime.title,
        episodes: anime.episodes,
        description: anime.synopsis,
        showTitleBelow: true,
        size: 'md' as const,
        score: anime.score,
        onClick: () => goTo(`/anime/${anime.jikanId}`),
        showOverlay: true,
        'data-anime-card': 'true',
      }
    },
    [goTo],
  )

  return (
    <PageBase showHeaderLogo={true} showUserInfo={true}>
      <SearchContainer>
        <AnimationContainer>
          <FloatingShape
            style={{
              top: '5%',
              left: '5%',
              animationDelay: '0s',
            }}
          />
          <FloatingShape
            style={{
              top: '10%',
              right: '8%',
              animationDelay: '1.5s',
            }}
          />
          <FloatingShape
            style={{
              bottom: '15%',
              left: '8%',
              animationDelay: '3s',
            }}
          />
          <FloatingShape
            style={{
              bottom: '8%',
              right: '5%',
              animationDelay: '4.5s',
            }}
          />
          <DotGrid />
        </AnimationContainer>

        <VStack spacing={8} align="center" position="relative" zIndex={2}>
          <SearchTitle>Discover Animes</SearchTitle>

          <SearchDescription>
            Search for your favorite anime series or movies, you just need to
            type it's name. Get detailed information, ratings, and
            recommendations.
          </SearchDescription>

          <SearchInputWrapper>
            <InputGroup size="lg" data-search-input-group="true">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="var(--chakra-colors-neutral-light)" />
              </InputLeftElement>

              <Input
                data-search-input="true"
                placeholder="Search for anime..."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                bg="rgba(255, 255, 255, 0.05)"
                borderColor="rgba(255, 255, 255, 0.1)"
                color="var(--chakra-colors-text-inverted)"
                _hover={{
                  borderColor: 'var(--chakra-colors-secondary-default)',
                }}
                _focus={{
                  borderColor: 'var(--chakra-colors-secondary-default)',
                  boxShadow: '0 0 0 1px var(--chakra-colors-secondary-default)',
                }}
              />

              <InputRightElement>
                {searchQuery && (
                  <IconButton
                    aria-label="Clear search"
                    icon={<FiX />}
                    size="sm"
                    variant="ghost"
                    onClick={handleClearSearch}
                    color="var(--chakra-colors-neutral-light)"
                    _hover={{ color: 'var(--chakra-colors-text-inverted)' }}
                  />
                )}
              </InputRightElement>
            </InputGroup>
          </SearchInputWrapper>

          {recentSearches.length > 0 &&
            searchResults.length === 0 &&
            !loading &&
            !searchQuery && (
              <RecentSearchesContainer>
                <HStack justify="space-between" w="100%" mb={4}>
                  <HStack>
                    <FiClock />
                    <Text
                      data-recent-searches-text="true"
                      color="var(--chakra-colors-neutral-light)"
                      fontSize="sm"
                    >
                      Recent Searches
                    </Text>
                  </HStack>
                  <Button
                    data-clear-all-button="true"
                    size="xs"
                    variant="ghost"
                    onClick={handleClearRecentSearches}
                    color="var(--chakra-colors-neutral-light)"
                    _hover={{ color: 'var(--chakra-colors-text-inverted)' }}
                  >
                    Clear All
                  </Button>
                </HStack>

                <HStack wrap="wrap" gap={2} justify="center">
                  {recentSearches.map((search, index) => (
                    <SearchTag
                      key={`${search}-${index}`}
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      {search}
                      <Box
                        as="span"
                        ml={2}
                        onClick={(e: React.MouseEvent) =>
                          handleRemoveRecentSearch(search, e)
                        }
                        _hover={{ color: 'var(--chakra-colors-red-400)' }}
                      >
                        <FiX size={12} />
                      </Box>
                    </SearchTag>
                  ))}
                </HStack>
              </RecentSearchesContainer>
            )}

          {!searchQuery && recentSearches.length === 0 && !loading && (
            <Box textAlign="center" mt={8}>
              <HStack justify="center" mb={4}>
                <FiTrendingUp />
                <Text color="var(--chakra-colors-neutral-light)" fontSize="sm">
                  Try searching for:
                </Text>
              </HStack>
              <HStack wrap="wrap" gap={2} justify="center">
                {[
                  'Attack on Titan',
                  'Naruto',
                  'One Piece',
                  'Demon Slayer',
                  'My Hero Academia',
                ].map((suggestion) => (
                  <SearchTag
                    key={suggestion}
                    onClick={() => handleRecentSearchClick(suggestion)}
                  >
                    {suggestion}
                  </SearchTag>
                ))}
              </HStack>
            </Box>
          )}

          {(loading || isTyping) && (
            <LoadingContainer>
              <Spinner
                data-loading-spinner="true"
                size="xl"
                color="secondary.default"
              />
              {isTyping && !loading && (
                <Text
                  data-loading-text="true"
                  color="var(--chakra-colors-neutral-light)"
                  mt={4}
                >
                  Typing...
                </Text>
              )}
            </LoadingContainer>
          )}

          {error && !loading && (
            <Alert
              status="error"
              variant="subtle"
              borderRadius="md"
              maxW="500px"
            >
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Search Error</Text>
                <Text fontSize="sm">{error}</Text>
              </Box>
            </Alert>
          )}

          {searchResults.length > 0 && !loading && (
            <ResultsContainer>
              <Text
                data-search-results-text="true"
                fontSize="lg"
                color="var(--chakra-colors-text-inverted)"
                mb={6}
              >
                Found {searchResults.length} results for "{searchQuery}"
              </Text>

              <SimpleGrid
                data-search-results-grid="true"
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={{ base: 4, md: 6 }}
              >
                {searchResults.map((anime) => (
                  <Box key={anime.jikanId} data-anime-card-container="true">
                    <AnimeCard {...convertAnimeToCardProps(anime)} />
                  </Box>
                ))}
              </SimpleGrid>
            </ResultsContainer>
          )}

          {searchQuery &&
            searchResults.length === 0 &&
            !loading &&
            !error &&
            !isTyping && (
              <EmptyStateContainer>
                <FiSearch
                  size={48}
                  color="var(--chakra-colors-neutral-light)"
                />
                <Text
                  data-empty-state-title="true"
                  fontSize="lg"
                  color="var(--chakra-colors-text-inverted)"
                  mt={4}
                >
                  No results found for "{searchQuery}"
                </Text>
                <Text
                  data-empty-state-description="true"
                  color="var(--chakra-colors-neutral-light)"
                  mt={2}
                >
                  Try different keywords or check your spelling
                </Text>
              </EmptyStateContainer>
            )}
        </VStack>
      </SearchContainer>
    </PageBase>
  )
}
