pipeline {
    agent any
    environment {
        NEW_VERSION = '1.3.0'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                echo "Building version ${NEW_VERSION}"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the application...'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    env.ENV = input message: "select the environment to deploy to", ok: "Done", parameter: [choice(name: 'ONE', choices: ['dev', 'staging', 'prod'], description: '')]
                     echo 'Deploying the application....' 
                }
            }
        }
    }
}
