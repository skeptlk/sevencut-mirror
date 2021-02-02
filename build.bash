npm run build -v # build react project
cd ../ # switch to root with wwwroot folder
rm -rf wwwroot # delete wwwroot and its content
mkdir wwwroot # create wwwroot folder
mv react/build/* wwwroot/ # move built project to wwwroot