(function(){
  var TinySearch = function(storage) {
    this.storage = storage || new MemoryStorage();
  };

  TinySearch.prototype.__defineGetter__("length", function() {
    return this.storage.length;
  });

  TinySearch.prototype.push = function(document) {
    this.storage.push(document)
  };

  TinySearch.prototype.find = function(terms) {
    var lowercase_terms = terms.toLowerCase();

    for (var i in this.storage.documents) {
      var document = this.storage.documents[i];
      var found = document.toLowerCase().indexOf(lowercase_terms) != -1;
      if (found) {
        return document;
      }
    }
    return null;
  };

  var MemoryStorage = function(options) {
    options = options || {};
    this.documents = [];
    this.limit = options.limit || null;
  };

  MemoryStorage.prototype.__defineGetter__("length", function() {
    return this.documents.length;
  });

  MemoryStorage.prototype.push = function(document) {
    this.documents.push(document);
    if (this.limit > 0 && this.documents.length > this.limit) {
      this.documents.splice(0, this.limit - 1);
    }
  };

  var LocalStorage = function(options) {
    options = options || {};
    this.key = options.key || 'tinySearchStorage';
    this.memoryStorage = new MemoryStorage(options);
    this.supported = LocalStorage.has_support();

    if (this.supported) {
      var documents = localStorage.getItem(this.key);
      if (documents) {
        this.memoryStorage.documents = JSON.parse(documents);
      }
    }
  };

  LocalStorage.prototype.__defineGetter__("length", function() {
    return this.memoryStorage.length;
  });

  LocalStorage.prototype.push = function(document) {
    this.memoryStorage.push(document);
    if (this.supported) {
      localStorage.setItem(this.key, JSON.stringify(this.memoryStorage.documents));
    }
  };

  LocalStorage.has_support = function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  };

  TinySearch.MemoryStorage = MemoryStorage;
  TinySearch.LocalStorage = LocalStorage;
  window.TinySearch = TinySearch;
})();
