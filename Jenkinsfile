pipeline {
    agent any

    environment {
        EC2_HOST = "ubuntu@54.152.237.30"
        DOCKER_IMAGE_NAME = "frontend-app"
        DOCKER_TAG = "latest"
        REMOTE_APP_DIR = "/home/ubuntu/frontend-app"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Likhitha-Konatham/frontendDeploy.git'
            }
        }

        stage('Check Files') {
            steps {
                sh 'ls -la'
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

        stage('Copy Files to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh "scp -o StrictHostKeyChecking=no -r . ${EC2_HOST}:${REMOTE_APP_DIR}"
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                       ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                            cd ${REMOTE_APP_DIR} &&
                            docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .
                        '
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'docker run -d -p 80:7004 --name ${DOCKER_IMAGE_NAME} ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}'
                    """
                }
            }
        }
    }
}

