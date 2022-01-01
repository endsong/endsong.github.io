var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        message: 'Deploy website'
    },
    () => {
        console.log('Completed deploy!')
    }
)
