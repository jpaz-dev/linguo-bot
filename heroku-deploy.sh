image_id=$DOCKER_IMAGE_ID
echo "IMAGE_ID: registry.heroku.com/$CI_HEROKU_APP_NAME:$CI_HEROKU_PROCESS_TYPE >>> $image_id" 

payload='{"updates": [{"type": "'"$CI_HEROKU_PROCESS_TYPE"'", "docker_image": "'"$image_id"'"}]}'
echo "PAYLOAD: $payload"

curl -n -X PATCH https://api.heroku.com/apps/$CI_HEROKU_APP_NAME/formation \
    -d "$payload" \
    -H "Content-Type: application/json" \
    -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
    -H "Authorization: Bearer $CI_HEROKU_TOKEN"
