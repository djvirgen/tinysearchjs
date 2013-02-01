describe('TinySearch', function() {
  it('is defined', function() {
    expect(TinySearch).toBeDefined();
  });

  describe('documents', function() {
    beforeEach(function(){
      this.search = new TinySearch;
    });

    it('initially is empty', function() {
      expect(this.search.length).toEqual(0);
    });

    it('can be added', function() {
      this.search.push('foo');
      this.search.push('bar');
      this.search.push('derp');
      expect(this.search.length).toEqual(3);
    });
  });

  describe('find', function() {
    beforeEach(function() {
      this.search = new TinySearch;
    });

    it('finds exact match', function() {
      this.search.push('foo');
      this.search.push('bar');
      this.search.push('derp');
      found = this.search.find('bar');
      expect(found).toEqual('bar');
    });

    it('finds partial match 1', function() {
      this.search.push('foo');
      this.search.push('bar');
      this.search.push('derp');
      found = this.search.find('ba');
      expect(found).toEqual('bar');
    });

    it('finds partial match 2', function() {
      this.search.push('foo');
      this.search.push('bar');
      this.search.push('derp');
      found = this.search.find('ar');
      expect(found).toEqual('bar');
    });

    it('finds case-insensitive match', function() {
      this.search.push('Foo');
      this.search.push('Bar');
      this.search.push('Derp');
      found = this.search.find('BAR');
      expect(found).toEqual('Bar');
    });

    it('returns null for no match', function() {
      found = this.search.find('nomatch');
      expect(found).toBeNull();
    });
  });

  describe('MemoryStorage', function() {
    it('can limit number of documents', function() {
      var search = new TinySearch(new TinySearch.MemoryStorage({limit: 2}));
      search.push('foo');
      search.push('bar');
      search.push('derp'); // too many!
      expect(search.length).toEqual(2);
      expect(search.find('foo')).toBeNull();
      expect(search.find('bar')).toBeDefined();
      expect(search.find('derp')).toBeDefined();
    });
  });

  describe('html5 local storage', function() {
    beforeEach(function() {
      this.localStorage = new TinySearch.LocalStorage();
      localStorage.removeItem(this.localStorage.key); // Ensure it's clear
      this.search = new TinySearch(this.localStorage);
    });

    afterEach(function() {
      localStorage.removeItem(this.localStorage.key); // Ensure it's clear
    });

    it('retains documents in local storage', function() {
      this.search.push("foo");
      var otherSearch = new TinySearch(new TinySearch.LocalStorage());
      expect(otherSearch.length).toEqual(1);
    });

    it('supports custom local storage key', function() {
      var customKey = 'my-custom-key';
      this.localStorage = new TinySearch.LocalStorage({key: customKey});
      localStorage.removeItem(this.localStorage.key); // Ensure it's clear
      this.search = new TinySearch(this.localStorage);
      this.search.push("foo");
      var otherSearch = new TinySearch(new TinySearch.LocalStorage({key: customKey}));
      expect(otherSearch.length).toEqual(1);
      expect(localStorage.getItem('my-custom-key')).toBeDefined();
    });

    it('can limit number of documents', function() {
      var search = new TinySearch(new TinySearch.LocalStorage({limit: 2}));
      search.push('foo');
      search.push('bar');
      search.push('derp'); // too many!
      expect(search.length).toEqual(2);
      expect(search.find('foo')).toBeNull();
      expect(search.find('bar')).toBeDefined();
      expect(search.find('derp')).toBeDefined();
    });
  });
});