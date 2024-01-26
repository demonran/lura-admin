pipeline {
   agent any
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '5')
        timeout(time: 1, unit: 'DAYS')
    }

   stages {
         stage("Build") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'aliyun', passwordVariable: 'password', usernameVariable: 'username')]) {
                        sh './deploy/ci upload ${username} ${password}'
                }

            }
        }

     stage('Deploy-sit') {
       when {
         branch 'master'
       }
       steps {
         sh './deploy/ci deploy'
       }
     }

     stage('Deploy-uat') {
       when {
         branch 'release'
       }
       steps {
         sh './deploy/ci deploy uat'
       }
     }
   }

  post {
    always {
      emailext(
        subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
        body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
        attachLog: true,
        to: "445999306@qq.com",
      )
    }
  }
}
