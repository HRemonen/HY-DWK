# Use an official Alpine runtime as a parent image
FROM --platform=linux/amd64 alpine:3.12

# Install curl and bash
RUN apk add --no-cache curl bash

# Set the working directory in the container
WORKDIR /app

# Copy the script into the container
COPY create_todo.sh .

# Make the script executable
RUN chmod +x create_todo.sh

# Run create_todo.sh when the container launches
CMD ["./create_todo.sh"]

