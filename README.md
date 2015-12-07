# panz.cards

API for cards in the Panini DragonBall Z TCG (2014)

## Routes

### `/cards`

Lists all cards

### `/cards/{id}`

Fetches the card by id

### `/search/cards?q={search string}`

Searches for the given string.  Use `in:{field}` to search on certain fields.

Based on https://help.github.com/articles/searching-repositories/, https://help.github.com/articles/search-syntax/ and https://developer.github.com/v3/search/

## License

MIT
