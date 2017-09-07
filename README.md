 # URL Shortener Microservice:
 
 
 ## User stories:
 ----------------------------------------------------
    
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. When I visit that shortened URL, it will redirect me to my original link.
      
   ### Example creation usage:

   <code>
   https://clumsy-meal.glitch.me/new/https://www.google.com 

   https://clumsy-meal.glitch.me/new/http://foo.com:80             
    </code> 

   ### Example creation output:
   <pre>
    { 
         "original_url":"http://foo.com:80",
         "short_url":"https://clumsy-meal.glitch.me/8170" 
    }
  </pre>
  ## Usage:
  <code>
    https://clumsy-meal.glitch.me/8170
    </code>
    
Will redirect to:

  <code>
    http://foo.com:80
  </code>
    

## \ ゜o゜)

