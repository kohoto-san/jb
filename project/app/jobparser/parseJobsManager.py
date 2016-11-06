from . import sources
from . import parseJobs


def parseJobsManager():

    text = """The Sr. Developer will provide Front-End solutions built upon the Drupal 7/8 framework. The candidate should have expert-level skills in HTML and CSS; write eloquent, structured JavaScript and be comfortable with standard libraries like jQuery. The ideal candidate is someone who enjoys stretching their limits and is comfortable working with server-side technology (like PHP) when the need arises and has familiarity working with APIs to produce powerful and engaging interfaces. 

        CHARACTERISTIC DUTIES AND RESPONSIBILITIES: 
        - Collaborates with other web developers and UX specialists to perform site build-outs and optimizations. 
        - Understands and implements basic usability principles and guidelines related to responsive web design and mobile-friendly development. 
        - Contributes to and assists in development test plans and provides technical support in all phases of testing and QA leading to implementation. 
        - Interacts well with both technical and non-technical colleagues and clients. 
        - Pays strong attention to visual detail. 
        - Weekend and off-hour work may be necessary on occasion. 
        - All other duties as assigned."""

    # parseJobs._analyzeJob('Sr. Frontend Enginer', 'Namecheap', text, skills=None)

    sources.stackoverflow()
    sources.github()
