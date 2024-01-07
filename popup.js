document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      document.getElementById('url').value = currentTab.url;
    });
  });
  var saveBug = document.querySelector("#saveBug");
    saveBug.addEventListener("click", (e)=>{
        var bugName = document.getElementById('bugName').value;
        var bugUrl = document.getElementById('url').value;
    
        if (!bugName) {
        alert('Please enter a bug name.');
        return;
        }
    
        chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        var bookmarksBar = bookmarkTreeNodes[0].children[0];
    
        // Find or create the "bug" folder
        var bugFolder = bookmarksBar.children.find(bookmark => bookmark.title === 'Bug');
        if (!bugFolder) {
            chrome.bookmarks.create({ parentId: bookmarksBar.id, title: 'Bug' }, function(newFolder) {
            bugFolder = newFolder;
            saveBugToFolder(bugName, bugUrl, bugFolder.id);
            });
        } else {
            saveBugToFolder(bugName, bugUrl, bugFolder.id);
        }
        });
    })
  
  function saveBug() {
    var bugName = document.getElementById('bugName').value;
    var bugUrl = document.getElementById('url').value;
  
    if (!bugName) {
      alert('Please enter a bug name.');
      return;
    }
  
    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
      var bookmarksBar = bookmarkTreeNodes[0].children[0];
  
      // Find or create the "bug" folder
      var bugFolder = bookmarksBar.children.find(bookmark => bookmark.title === 'Bug');
      if (!bugFolder) {
        chrome.bookmarks.create({ parentId: bookmarksBar.id, title: 'Bug' }, function(newFolder) {
          bugFolder = newFolder;
          saveBugToFolder(bugName, bugUrl, bugFolder.id);
        });
      } else {
        saveBugToFolder(bugName, bugUrl, bugFolder.id);
      }
    });
  }
  
  function saveBugToFolder(bugName, bugUrl, folderId) {
    chrome.bookmarks.create({
      parentId: folderId,
      title: bugName,
      url: bugUrl
    }, function() {
      alert('Bug saved successfully!');
    });
  }
  