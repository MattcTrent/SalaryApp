FROM openjdk:17-alpine

WORKDIR /backendApp

# could use . here as working directory is now /frontendApp
COPY . /backendApp

EXPOSE 8080

CMD [ "/usr/bin/env", "/usr/lib/jvm/java-17-openjdk-amd64/bin/java", "@/tmp/cp_dm90xkc31vi1whrs00k953khy.argfile", "com.SalaryApplication.SalaryApplication" ]

