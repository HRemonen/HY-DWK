# Use an official Alpine runtime as a parent image
FROM --platform=linux/amd64 alpine:3.12

# Install curl and bash
RUN apk add --no-cache curl bash
RUN apk --update add postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy the script into the container
COPY db_backup.sh .

# Make the script executable
RUN chmod +x db_backup.sh

# Run db_backup.sh when the container launches
CMD ["./db_backup.sh"]

