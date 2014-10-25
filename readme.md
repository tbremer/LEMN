# VLAMP
A basic Ubuntu 12.04 Vagrant set up with nginx,

## Requirements
* VirtualBox - Free virtualization software [Download Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* Vagrant **1.3+** - Tool for working with virtualbox images [Download Vagrant](https://www.vagrantup.com)
* Git - Source Control Management [Download Git](http://git-scm.com/downloads)

## Setup
* Clone this repository `https://github.com/tbremer/LEMN.git`
* run `vagrant up` inside the newly created directory (the first time you run vagrant it will need to fetch the virtual box image which is ~300mb so depending on your download speed this could take some time)
* Vagrant will then use puppet to provision the base virtual box with our LAMP stack.
* You can verify that everything was successful by opening http://localhost:8888 in a browser

## Usage
Some basic information on interacting with the vagrant box

### Port Forwards
* 8888 - nginx base


### Vagrant

Vagrant is [very well documented](http://vagrantup.com/v1/docs/index.html) but here are a few common commands:

* `vagrant up` starts the virtual machine and provisions it
* `vagrant suspend` will essentially put the machine to 'sleep' with `vagrant resume` waking it back up
* `vagrant halt` attempts a graceful shutdown of the machine and will need to be brought back with `vagrant up`
* `vagrant ssh` gives you shell access to the virtual machine
* `vagrant destroy` removes all known information about this box (keeps your www folder).

----
##### Virtual Machine Specifications #####
* OS     - Ubuntu 12.04
* NODE   - LATEST
* NPM    - LATEST
* nginx  - LATEST
