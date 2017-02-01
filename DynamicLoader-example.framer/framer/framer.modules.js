require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"DynamicLoader":[function(require,module,exports){

/*
DynamicLoader Module for FramerJS
https://github.com/LucienLee/framer-DynamicLoader/

Created by Lucien Lee (@luciendeer), Jan. 12th, 2016

DynamicLoader braeks the barriars between 3rd party web development libraries and Framer, which
help you load local, external stylesheets and scripts dynamically.

Add the following line to your project in Framer Studio.
	{DynamicLoader} = require 'DynamicLoader'

[Load one file]
DynamicLoader.add('script.js').then(->
 * when script.js loaded successfully
...
).catch(->
 * when script.js loaded failed
...
)

[Load file in series]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )

[Load file in parallel]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )
 */
exports.DynamicLoader = (function() {
  function DynamicLoader() {}

  DynamicLoader.add = function(url) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var file, loaded;
      if (url.substr(url.lastIndexOf('.')) === ".js") {
        loaded = Array.prototype.find.call(document.getElementsByTagName('script'), function(element) {
          if (element.getAttribute('src') === url) {
            return element;
          }
        });
        if (loaded !== void 0) {
          return resolve('have loaded');
        }
        file = document.createElement('script');
        file.src = url;
      } else if (url.substr(url.lastIndexOf('.')) === ".css") {
        loaded = Array.prototype.find.call(document.getElementsByTagName('link'), function(element) {
          if (element.getAttribute('rel') === url) {
            return element;
          }
        });
        if (loaded !== void 0) {
          return resolve('have loaded');
        }
        file = document.createElement('link');
        file.rel = "stylesheet";
        file.href = url;
      }
      file.addEventListener('load', function() {
        return resolve(file);
      });
      file.addEventListener('error', function() {
        return reject(file);
      });
      return document.body.appendChild(file);
    });
    return promise;
  };

  DynamicLoader.series = function(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw "ERROR: NO URL IN ARRAY!";
    }
    return urls.reduce((function(_this) {
      return function(promise, url) {
        return promise.then(function() {
          return _this.add(url);
        });
      };
    })(this), Promise.resolve());
  };

  DynamicLoader.parallel = function(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw "ERROR: NO URL IN ARRAY!";
    }
    return Promise.all(urls.map((function(_this) {
      return function(url) {
        return _this.add(url);
      };
    })(this)));
  };

  return DynamicLoader;

})();


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvRHluYW1pY0xvYWRlci5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMjI1xuRHluYW1pY0xvYWRlciBNb2R1bGUgZm9yIEZyYW1lckpTXG5odHRwczovL2dpdGh1Yi5jb20vTHVjaWVuTGVlL2ZyYW1lci1EeW5hbWljTG9hZGVyL1xuXG5DcmVhdGVkIGJ5IEx1Y2llbiBMZWUgKEBsdWNpZW5kZWVyKSwgSmFuLiAxMnRoLCAyMDE2XG5cbkR5bmFtaWNMb2FkZXIgYnJhZWtzIHRoZSBiYXJyaWFycyBiZXR3ZWVuIDNyZCBwYXJ0eSB3ZWIgZGV2ZWxvcG1lbnQgbGlicmFyaWVzIGFuZCBGcmFtZXIsIHdoaWNoXG5oZWxwIHlvdSBsb2FkIGxvY2FsLCBleHRlcm5hbCBzdHlsZXNoZWV0cyBhbmQgc2NyaXB0cyBkeW5hbWljYWxseS5cblxuQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby5cblx0e0R5bmFtaWNMb2FkZXJ9ID0gcmVxdWlyZSAnRHluYW1pY0xvYWRlcidcblxuW0xvYWQgb25lIGZpbGVdXG5EeW5hbWljTG9hZGVyLmFkZCgnc2NyaXB0LmpzJykudGhlbigtPlxuIyB3aGVuIHNjcmlwdC5qcyBsb2FkZWQgc3VjY2Vzc2Z1bGx5XG4uLi5cbikuY2F0Y2goLT5cbiMgd2hlbiBzY3JpcHQuanMgbG9hZGVkIGZhaWxlZFxuLi4uXG4pXG5cbltMb2FkIGZpbGUgaW4gc2VyaWVzXVxuRHluYW1pY0xvYWRlci5zZXJpZXMoWydvbmUuanMnLCAndHdvLmNzcycsIC4uLl0pLnRoZW4oIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbENhbGxiYWNrIClcblxuW0xvYWQgZmlsZSBpbiBwYXJhbGxlbF1cbkR5bmFtaWNMb2FkZXIuc2VyaWVzKFsnb25lLmpzJywgJ3R3by5jc3MnLCAuLi5dKS50aGVuKCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjayApXG5cbiMjI1xuXG5cblxuXG5jbGFzcyBleHBvcnRzLkR5bmFtaWNMb2FkZXJcblxuXHQjIFByb21pc2lmeSBzaW5nbGUgZHluYW1pYyBzY3JpcHQgbG9hZGluZ1xuXHRAYWRkID0gKHVybCkgLT5cblx0XHRwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgLT5cblx0XHRcdGlmIHVybC5zdWJzdHIoIHVybC5sYXN0SW5kZXhPZignLicpICkgaXMgXCIuanNcIlxuXHRcdFx0XHQjIGxvYWQgc2NyaXB0IG9uY2Vcblx0XHRcdFx0bG9hZGVkID0gQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JyksIChlbGVtZW50KSAtPlxuXHRcdFx0XHRcdGlmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSBpcyB1cmwgdGhlbiByZXR1cm4gZWxlbWVudFxuXHRcdFx0XHRpZiBsb2FkZWQgaXNudCB1bmRlZmluZWQgdGhlbiByZXR1cm4gcmVzb2x2ZSAnaGF2ZSBsb2FkZWQnXG5cblx0XHRcdFx0ZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcblx0XHRcdFx0ZmlsZS5zcmMgPSB1cmxcblx0XHRcdGVsc2UgaWYgdXJsLnN1YnN0ciggdXJsLmxhc3RJbmRleE9mKCcuJykgKSBpcyBcIi5jc3NcIlxuXHRcdFx0XHQjIGxvYWQgc3R5bGUgb25jZVxuXHRcdFx0XHRsb2FkZWQgPSBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJyksIChlbGVtZW50KSAtPlxuXHRcdFx0XHRcdGlmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWwnKSBpcyB1cmwgdGhlbiByZXR1cm4gZWxlbWVudFxuXHRcdFx0XHRpZiBsb2FkZWQgaXNudCB1bmRlZmluZWQgdGhlbiByZXR1cm4gcmVzb2x2ZSAnaGF2ZSBsb2FkZWQnXG5cblx0XHRcdFx0ZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2xpbmsnXG5cdFx0XHRcdGZpbGUucmVsID0gXCJzdHlsZXNoZWV0XCJcblx0XHRcdFx0ZmlsZS5ocmVmID0gdXJsXG5cblx0XHRcdGZpbGUuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcsIC0+XG5cdFx0XHRcdHJlc29sdmUgZmlsZVxuXHRcdFx0ZmlsZS5hZGRFdmVudExpc3RlbmVyICdlcnJvcicsIC0+XG5cdFx0XHRcdHJlamVjdCBmaWxlXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIGZpbGVcblx0XHQpXG5cblx0XHRyZXR1cm4gcHJvbWlzZVxuXG5cdCMgRHluYW1pYyBmaWxlIGxvYWRpbmcgaW4gc2VyaWVzXG5cdEBzZXJpZXMgPSAodXJscykgLT5cblx0XHRpZiAhQXJyYXkuaXNBcnJheSh1cmxzKSBvciB1cmxzLmxlbmd0aCBpcyAwIHRoZW4gdGhyb3cgXCJFUlJPUjogTk8gVVJMIElOIEFSUkFZIVwiXG5cblx0XHRyZXR1cm4gdXJscy5yZWR1Y2UoXG5cdFx0XHQocHJvbWlzZSwgdXJsKSA9PlxuXHRcdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKCA9PiBAYWRkKHVybCkgKVxuXHRcdFx0LFxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkpXG5cblx0IyBEeW5hbWljIGZpbGUgbG9hZGluZyBpbiBwYXJhbGxlbFxuXHRAcGFyYWxsZWwgPSAodXJscykgLT5cblx0XHRpZiAhQXJyYXkuaXNBcnJheSh1cmxzKSBvciB1cmxzLmxlbmd0aCBpcyAwIHRoZW4gdGhyb3cgXCJFUlJPUjogTk8gVVJMIElOIEFSUkFZIVwiXG5cblx0XHRQcm9taXNlLmFsbChcblx0XHRcdHVybHMubWFwKCAodXJsKSA9PlxuXHRcdFx0XHRyZXR1cm4gQGFkZCh1cmwpXG5cdFx0KSkiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTs7QURBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NNLE9BQU8sQ0FBQzs7O0VBR2IsYUFBQyxDQUFBLEdBQUQsR0FBTyxTQUFDLEdBQUQ7QUFDTixRQUFBO0lBQUEsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUFRLFNBQUMsT0FBRCxFQUFVLE1BQVY7QUFDckIsVUFBQTtNQUFBLElBQUcsR0FBRyxDQUFDLE1BQUosQ0FBWSxHQUFHLENBQUMsV0FBSixDQUFnQixHQUFoQixDQUFaLENBQUEsS0FBc0MsS0FBekM7UUFFQyxNQUFBLEdBQVMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBckIsQ0FBMEIsUUFBUSxDQUFDLG9CQUFULENBQThCLFFBQTlCLENBQTFCLEVBQW1FLFNBQUMsT0FBRDtVQUMzRSxJQUFHLE9BQU8sQ0FBQyxZQUFSLENBQXFCLEtBQXJCLENBQUEsS0FBK0IsR0FBbEM7QUFBMkMsbUJBQU8sUUFBbEQ7O1FBRDJFLENBQW5FO1FBRVQsSUFBRyxNQUFBLEtBQVksTUFBZjtBQUE4QixpQkFBTyxPQUFBLENBQVEsYUFBUixFQUFyQzs7UUFFQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkI7UUFDUCxJQUFJLENBQUMsR0FBTCxHQUFXLElBUFo7T0FBQSxNQVFLLElBQUcsR0FBRyxDQUFDLE1BQUosQ0FBWSxHQUFHLENBQUMsV0FBSixDQUFnQixHQUFoQixDQUFaLENBQUEsS0FBc0MsTUFBekM7UUFFSixNQUFBLEdBQVMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBckIsQ0FBMEIsUUFBUSxDQUFDLG9CQUFULENBQThCLE1BQTlCLENBQTFCLEVBQWlFLFNBQUMsT0FBRDtVQUN6RSxJQUFHLE9BQU8sQ0FBQyxZQUFSLENBQXFCLEtBQXJCLENBQUEsS0FBK0IsR0FBbEM7QUFBMkMsbUJBQU8sUUFBbEQ7O1FBRHlFLENBQWpFO1FBRVQsSUFBRyxNQUFBLEtBQVksTUFBZjtBQUE4QixpQkFBTyxPQUFBLENBQVEsYUFBUixFQUFyQzs7UUFFQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkI7UUFDUCxJQUFJLENBQUMsR0FBTCxHQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUwsR0FBWSxJQVJSOztNQVVMLElBQUksQ0FBQyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixTQUFBO2VBQzdCLE9BQUEsQ0FBUSxJQUFSO01BRDZCLENBQTlCO01BRUEsSUFBSSxDQUFDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFNBQUE7ZUFDOUIsTUFBQSxDQUFPLElBQVA7TUFEOEIsQ0FBL0I7YUFFQSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBMUI7SUF2QnFCLENBQVI7QUEwQmQsV0FBTztFQTNCRDs7RUE4QlAsYUFBQyxDQUFBLE1BQUQsR0FBVSxTQUFDLElBQUQ7SUFDVCxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQUQsSUFBd0IsSUFBSSxDQUFDLE1BQUwsS0FBZSxDQUExQztBQUFpRCxZQUFNLDBCQUF2RDs7QUFFQSxXQUFPLElBQUksQ0FBQyxNQUFMLENBQ04sQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLE9BQUQsRUFBVSxHQUFWO0FBQ0MsZUFBTyxPQUFPLENBQUMsSUFBUixDQUFjLFNBQUE7aUJBQUcsS0FBQyxDQUFBLEdBQUQsQ0FBSyxHQUFMO1FBQUgsQ0FBZDtNQURSO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQURNLEVBSU4sT0FBTyxDQUFDLE9BQVIsQ0FBQSxDQUpNO0VBSEU7O0VBVVYsYUFBQyxDQUFBLFFBQUQsR0FBWSxTQUFDLElBQUQ7SUFDWCxJQUFHLENBQUMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxJQUFkLENBQUQsSUFBd0IsSUFBSSxDQUFDLE1BQUwsS0FBZSxDQUExQztBQUFpRCxZQUFNLDBCQUF2RDs7V0FFQSxPQUFPLENBQUMsR0FBUixDQUNDLElBQUksQ0FBQyxHQUFMLENBQVUsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEdBQUQ7QUFDVCxlQUFPLEtBQUMsQ0FBQSxHQUFELENBQUssR0FBTDtNQURFO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFWLENBREQ7RUFIVyJ9
