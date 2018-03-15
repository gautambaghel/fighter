# Web-Development CS5610 spring 2018

![Northeastern](https://github.com/gautambaghel/Web-Development/blob/master/img/neu.JPG "Managing Software Development")

This repository is made for CS5610 Web Development class taught by Professor Nathaniel Tuck.

## Getting Started

Prerequisites:

 * Erlang / OTP ~ 20.2
 * Elixir ~ 1.5
 * NodeJS ~ 9.4

To start your Phoenix server:

 * Install dependencies with `mix deps.get`
 * Install Node.js dependencies with `cd assets && npm install`
 * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Deployment Instructions

Instructions to deploy to an Ubuntu 16.04 VPS:

As root:

 * Install Erlang and Elixir packages.
 * Create a new Linux user account, "memory".
 * Add a nginx config for the new site. See "memory.nginx" for an example.

As the new user:

 * Install NodeJS through NVM.
 * Check out this git repository to ~/src/memory
 * Run the deploy script.
   * You may need to answer "Y" and press return.
 * Run the start script to start your server.

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

Ready to run in production? Please
[check our deployment guides](http://www.phoenixframework.org/docs/deployment).


## Course Webpage

For more info visit - [Course Webpage](http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/)

## Authors

* **Gautam Baghel** - *Initial work* - [Github](https://github.com/gautambaghel)
* **Sophia Ho** - *Initial work* - [Github](https://github.com/sophiaho)

## Guides

The guide for this project is listed here - see the [Guide](http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/guides/) file for details

## Notes

The notes for this project is listed here - see the [Notes](http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/) file for details

## Acknowledgments

* **Nathaniel Tuck** - *Instructor* - [Info](https://www.ccis.northeastern.edu/people/michael-weintraub/)