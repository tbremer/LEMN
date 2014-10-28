# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    ##
    ## SET UP THE BOX BASICS
    ##
        config.vm.box = "ubuntu/trusty32"
        config.vm.provider "virtualbox" do |v|
            v.name = "LEMN"
            v.memory = 512
            v.cpus = 2
        end

    ##
    ## SET UP THE FOLDERS
    ##
        config.vm.synced_folder "www", "/var/www/"
        config.vm.synced_folder "bash_scripts", "/home/vagrant/bash_scripts"
        config.vm.synced_folder "nginx/global", "/etc/nginx/global"
        config.vm.synced_folder "nginx/sites-available", "/etc/nginx/sites-available"

    ##
    ## ADD PORT FORWARDS AND PRIVATE NETWORK
    ##
        config.vm.network "forwarded_port", guest: 80, host: 8888, auto_correct: true ## NGINX LISTEN PORT
        config.vm.network :forwarded_port, guest: 3306, host: 8889, auto_correct: true ## MYSQL LISTEN PORT

    ##
    ## PROVISION LEMN
    ##
        config.vm.provision :shell, :path   => "bash_scripts/bootstrap.sh"
        config.vm.provision :puppet do |puppet|
            puppet.manifests_path = "puppet/manifests"
            puppet.manifest_file  = "base.pp"
            puppet.module_path = "puppet/modules"
        end

    ##
    ## END OF THE LINE SCRIPTS
    ##
        config.vm.provision :shell, :path   => "puppet/scripts/enable_remote_mysql_access.sh"
        config.vm.provision :shell, :path   => "bash_scripts/start_nginx_and_node_servers.sh"
end

