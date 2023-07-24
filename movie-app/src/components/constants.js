import MoviesImg from "../assets/images/movies.png";
import ListImg from "../assets/images/shopping.png";
import ShoppingImg from "../assets/images/checkout.png";
import CheckoutImg from "../assets/images/Online-Payment-PNG-Photo.png";
// ====================================== API ================================================
export const
    API_KEY = '4c09e57335590af48eff21d42aad5f3e',
    API_URL = 'https://api.themoviedb.org',
    GENRES = '/3/genre/movie/list',
    SEARCH_URL = `/3/search/movie?api_key=${API_KEY}&include_adult=false`,
    DISCOVER_URL = `/3/discover/movie?api_key=${API_KEY}&include_adult=false`,
    IMAGE_URL = 'https://image.tmdb.org/t/p/w500',
    SESSION_URL = '/cart/',
    PURCHASES_URL = '/purchase',
    ORDER_CONFIRMATION_URL = '/order-complete';
// ====================================================================================================
const NAME_PATTERN = /^[A-Za-z]{3,20}$/,
    INAVALED_MESSAGE = 'name must be between 3 and 20 characters including letters only';
export const FORM_INPUTS = [
        {
            label: 'First Name', type: 'text', placeholder: 'Jhon', name: 'firstName', pattern: {NAME_PATTERN},
            invalidMsg: `First ${INAVALED_MESSAGE}`
        },
        {
            label: 'Last Name', type: 'text', placeholder: 'Doe', name: 'lastName', pattern: {NAME_PATTERN},
            invalidMsg: `Last ${INAVALED_MESSAGE}`
        },
        {
            label: 'Email', type: 'email', placeholder: 'example@gmail.com', name: 'email', pattern: '',
            invalidMsg: 'Email must be valid'
        },
    ],
    FORM_DATA = {
        firstName: '',
        lastName: '',
        email: '',
        payment: '',
    },
    HOME_ITEMS = [
        {
            title: "Shopping Cart",
            description: "View your shopping cart above in the navbar",
            link: "/#cart",
            img: ShoppingImg
        }, {
            title: "Movies",
            description: "View our selection of movies and start shopping",
            link: "/movies",
            img: ListImg
        }, {
            title: "Checkout",
            description: "Checkout your items",
            link: "/checkout",
            img: CheckoutImg
        }
    ],
    movieImg = MoviesImg,
    PRICE = 3.99,
    TITLE_STYLE = {fontStyle: 'italic', textShadow: '2px 2px 2px #000000', fontSize: '50px'},
    INIT_FILTER = {
        genres: [],
        releaseYear: {start: null, end: null},
        popularmovie: false
    },
    DATE_RANGE_ERROR = "Start year cannot be after end year",
    FIRST_PAGE = 1,
    SORT_BY = `&sort_by=popularity.desc`,
    START_YEAR = "primary_release_date.gte",
    END_YEAR = "primary_release_date.lte",
    FILTERED_GENRES = ['Animation', 'Music', 'Family'],
    MAX_PAGES = 500,
    CART_ITEMS_PER_PAGE = 5,
    ALREADY_EXIST = 'Item already in cart',
    ITEM_ADD_SUCCESS = 'Item added successfully',
    ITEM_REMOVED = 'Item removed successfully',
    ITEMS_REMOVED = 'ItemS removed successfully',
    ITEMS_NOT_SELECTED = 'No items selected',
    CART_CLEARED = 'Cart cleared successfully';
// ====================================================================================================


