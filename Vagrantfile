# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    ##
    ## SET UP THE BOX BASICS
    ##
        config.vm.box = "precise32"
        config.vm.box_url = "http://files.vagrantup.com/precise32.box"
        config.vm.hostname = "acorn"

    ##
    ## SET UP THE FOLDERS
    ##
        config.vm.synced_folder "www", "/home/vagrant/www"

    ##
    ## ADD PORT FORWARDS AND PRIVATE NETWORK
    ##
        config.vm.network "forwarded_port", guest: 3000, host: 3000
        #config.vm.network "private_network", ip: "192.168.33.10"

    ##
    ## PROVISION MYSQL
    ##
        config.vm.provision :puppet do |puppet|
            puppet.manifests_path = "puppet/manifests"
            puppet.manifest_file  = "base.pp"
            puppet.module_path = "puppet/modules"
        end

    ##
    ## END OF THE LINE SCRIPTS
    ##
        config.vm.provision :shell, path: "bootstrap.sh"
        config.vm.provision :shell, :path => "puppet/scripts/enable_remote_mysql_access.sh"
        config.vm.provision :shell, :inline => "echo \"America/Chicago\" | sudo tee /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata"
end

