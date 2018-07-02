# design an URL shortening service (tinyurl, bitly, etc)

1. http://blog.gainlo.co/index.php/2016/03/08/system-design-interview-question-create-tinyurl-system/
2. https://www.interviewbit.com/problems/design-url-shortener/
3. https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/
4. https://www.interviewcake.com/question/java/url-shortener

## Q: how would you design a service that would generate a shorter and unique alias for a given URL?

### Design Goals
1. need to store a LOT of links
2. links should be as short as possible
3. following a shortlink should be FAST
4. follower should be resilient to load spikes

### Features Questions (see if they ask these questions)

1. full web app or api?
2. characters for tiny url? length of tiny url?  
This is important, as it'd cap the max number of tiny urls we could provide and maintain. A length of 7 [A-Za-z,0-9] yields 62 ^ 7 = 3500 billion urls (it's estimated that there are approx 644 million urls right now, so this would be ok)
2. do we need authentication or such?
3. can links be modified/deleted?
4. if can't be deleted, do they persist forever?
5. can people *choose* their tiny url?
6. do we need analytics?
7. deployment -- single machine or distributed?
1. storage concerns?
If storing ID and url, where ID is 7 characters and URL is a max of 2083 characters, that's 7 * 4 + 2083 * 4 = 8.4KB per entry. If we store 1M urls that'd be around 8.4GB of storage. If we need more info, like a datetime, a database index, etc, the number increases.
1. db read or write biased?
1. db distributed?
2. concurrency concerns?


### Considerations

1. how to generate a unique ID for each URL
2. how would you generate unique IDs at scale (thousands of requests coming every second)
3. how would your service handle redirects
4. how would you support custom short URLs?
5. how to delete expired URLs
6. how to track click stats?




### Data Model
Likely something like a LINK which contains a short link and the original link

don't *really* need to store the entire short link, as it's already assumed to be the path portion of our service...HOWEVER, what happens if we *do* store it? *don't* store it?

### Design
Endpoints should be RESTful, so if we're calling it a ShortLink then it should probably be

ourhost/api/v1/shortLink

