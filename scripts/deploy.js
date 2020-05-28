const ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'master',
        repo: 'https://github.com/nickheal/poker-plan.git',
        user: {
            name: 'nickheal',
            email: 'nick3_4@hotmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
);
