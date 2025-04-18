pipeline {
    agent any

    environment {
        EC2_HOST = "ubuntu@3.92.195.39"
    }

    stages {
        stage("Git Checkout") {
            steps {
                git branch: 'main', url: 'https://github.com/Likhitha-Konatham/frontendDeploy'
            }
        }

        stage('Test SSH to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'hostname'"
                }
            }
        }

         stage('Check EC2 Server Version') {
            steps {
                sshagent(['ec2-ssh']) {  
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'cat /etc/os-release'"
                }
            }
        }

        stage('Check Docker Version') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'docker --version'"
                }
            }
        }
    }
}

