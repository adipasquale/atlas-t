currhash=$(ls www/css/style-*.css | sed -E "s/www\/css\/style-([0-9a-z]+).css/\1/")
newhash=$(md5sum "www/css/style-${currhash}.css" | cut -d' ' -f1)
mv www/css/style-${currhash}.css www/css/style-${newhash}.css
echo "Renamed www/css/style-${currhash}.css to www/css/style-${newhash}.css"

sed -i "" "s/style-${currhash}.css/style-${newhash}.css/" www/11ty_input/_layouts/default.njk
echo "Updated path in www/11ty_input/_layouts/default.njk"
