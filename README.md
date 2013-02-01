TinySearch
==========

A tiny, client-side search engine with option to persist search index in the
browser's local storage.

Wha?? Client-side searching? What's the point?
----------------------------------------------

This library is helpful for searching non-critical data directly on the client
without requiring a trip to the server. It's especially useful in forms for
helping to populate auto-complete based on the user's past entries.

Don't browsers already have form auto-fill?
-------------------------------------------

Yes, but this gives you extra control by letting you inject your own
recommendations into the index. For example, if you're building a song search,
you may want to store the user's previous searches as well as each search result
they clicked on.

Basic Usage
-----------

    // Create the search engine
    tinySearch = new TinySearch();

    // Add some strings
    tinySearch.push('Apple');
    tinySearch.push('Banana');
    tinySearch.push('Cheeseburger');

    // Search the index
    tinySearch.find('app');   // returns 'Apple'
    tinySearch.find('nana');  // returns 'Banana'
    tinySearch.find('burg');  // returns 'Cheeseburger'

Limiting the Index Size
-----------------------

By default, TinySearch will not enforce a limit as to the number of documents
it will store in its index. But it'd probably be a good idea to set one, so
here's how you'd do it with the `MemoryStorage` store:

    // Create the search engine
    tinySearch = new TinySearch(new TinySearch.MemoryStorage({limit: 2}));

    // Add some strings
    tinySearch.push('Apple');
    tinySearch.push('Banana');
    tinySearch.push('Cheeseburger');

    // Search the index
    tinySearch.find('app');   // returns null because limit was enforced
    tinySearch.find('nana');  // returns 'Banana'
    tinySearch.find('burg');  // returns 'Cheeseburger'

HTML5 and localStorage
----------------------

If you want to store the index in localStorage to help returning visitors,
you can do so by providing `TinySearch` with a `TinySearch.LocalStorage`
instance:

    // Create the search engine with localStorage support
    tinySearch = new TinySearch(new TinySearch.LocalStorage({limit: 100}));

    // Add some strings
    tinySearch.push('Apple');
    tinySearch.push('Banana');
    tinySearch.push('Cheeseburger');

    // ** User leaves site and comes back later **

    // Search engine is created again using LocalStorage store
    tinySearch = new TinySearch(new TinySearch.LocalStorage({limit: 100}));

    // Index is still searchable!
    tinySearch.find('app');   // returns 'Apple'
    tinySearch.find('nana');  // returns 'Banana'
    tinySearch.find('burg');  // returns 'Cheeseburger'

