$.ajax({
  url: 'https://api.github.com/user/repos?type=owner&sort=created',
  type: 'GET',
  headers: {
    Authorization: `token ${githubToken}`
  }
}).done(data => console.log(data))
