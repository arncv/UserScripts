// ==UserScript==
// @name        Google™ Search Enhancer
// @namespace   https://greasyfork.org/en/users/1175165-arnvgl
// @version     1.0
// @description Enhances Google search results by adding additional information and customization options.
// @license     MIT
// @match       https://www.google.com/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
  
    // Highlight search terms in search results
    function highlightSearchTerms() {
      const searchInput = document.querySelector('input[name="q"]');
      const searchTerms = searchInput.value.split(' ');
      const searchResults = document.querySelectorAll('.g');
  
      searchResults.forEach(result => {
        const resultText = result.innerText.toLowerCase();
        searchTerms.forEach(term => {
          if (resultText.includes(term.toLowerCase())) {
            const regex = new RegExp(term, 'gi');
            result.innerHTML = result.innerHTML.replace(regex, '<span style="background-color: yellow;">$&</span>');
          }
        });
      });
    }
  
    // Add a "Save to Evernote" button to search results
    function addSaveToEvernoteButton() {
      const searchResults = document.querySelectorAll('.g');
  
      searchResults.forEach(result => {
        const link = result.querySelector('a');
        const url = link.href;
        const button = document.createElement('a');
        button.href = `https://www.evernote.com/clip.action?url=${encodeURIComponent(url)}`;
        button.innerText = 'Save to Evernote';
        button.style.marginLeft = '10px';
        result.appendChild(button);
      });
    }
  
    // Modify search results layout
    function modifySearchResultsLayout() {
      // Add custom CSS styles to modify the layout
      const customCSS = `
        .g {
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 10px;
        }
      `;
      const style = document.createElement('style');
      style.innerHTML = customCSS;
      document.head.appendChild(style);
    }
  
    // Integrate with Google Translate
    function integrateWithGoogleTranslate() {
      const searchInput = document.querySelector('input[name="q"]');
      const translateButton = document.createElement('button');
      translateButton.innerText = 'Translate';
      translateButton.style.marginLeft = '10px';
      translateButton.addEventListener('click', () => {
        const query = searchInput.value;
        const translateUrl = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(query)}&op=translate`;
        window.open(translateUrl, '_blank');
      });
      searchInput.parentNode.appendChild(translateButton);
    }
  
    // Call the functions to enhance Google search results
    highlightSearchTerms();
    addSaveToEvernoteButton();
    modifySearchResultsLayout();
    integrateWithGoogleTranslate();
  })();