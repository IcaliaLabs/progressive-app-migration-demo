# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# This listens to the new app's search bar changes, which are published in the
# 'com.icalialabs.demo.search' postRobot's channel:
postRobot.on 'com.icalialabs.demo.new-app.search', (event) =>
  searchTerms = event.data.terms
  searchTerms = '*' unless !!searchTerms
  Turbolinks.visit "/old-screen?terms=#{searchTerms}"

  # Have it return some data to the calling window
  { someText: 'Some Text' }


# Register event listeners upon turbolinks:load:
jQuery(document).on 'turbolinks:load', (tubolinksLoadEvent) =>

  # This one listens for clicks on any of the "saved search results" links, and should update the
  # new app's search bar with the terms
  jQuery('body.old-screen.show a.search-results').on 'click', (searchResultClick) =>
    clickedLinkQuery = URI(searchResultClick.target.href).query(true)
    postRobot
      .sendToParent('com.icalialabs.demo.old-app.search', clickedLinkQuery)
      .catch (err) =>
        console.log 'This page was not loaded within the new app - ignoring'
