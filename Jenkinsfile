pipeline {
    agent any
    parameters {
       // string(name: 'VERSION', defaultValue:'', description:'version to deploy on the server')
        choice(name: '  VERSION', choices: ['1.1.0', '1.2.1', '1.3.0], description: '')
        booleanParam(name: 'executeTests', defaultValue: true, description:'')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the application..'
            }
        }
        stage('Test') {
            when {
                expression {
                    params.executeTests
                }
            }
            steps {
                echo 'Testing the application...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application....'
                echo "Deploying version ${params.VERSION}"
            }
        }
    }
}
