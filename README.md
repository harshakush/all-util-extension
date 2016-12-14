# all-util-extension

SWYW is an extension being developed to filter out the unwanted informaition from the whitelisted sites. 

The manifest.json will contain all the sites. Currently it supports filtering of the news.google.com.


High Level Architecture.
1. Chrome extension extracts the html body.
2. Sends it to a helper python script.
3. Python + NLTK is then used to parse the data and send back the latest html body.
4. The parsed filtered HTML body is then used to render it.


Current Implementation.

1. Chrome extension does all the parsing and modifying the html body.


Reading:

1. Native chrome extension.
2. Python + NLTK.
