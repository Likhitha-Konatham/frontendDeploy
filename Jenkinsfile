pipeline {
    agent any

    environment {
        EC2_HOST = "ubuntu@3.92.195.39" 
    }

    stages {
        stage('Test SSH to EC2') {
            steps {
                sshagent(['ec2-ssh']) { 
                    sh "ssh -o StrictHostKeyChecking=no ${EC2_HOST} 'hostname && uptime'"
                }
            }
        }
    }
}

