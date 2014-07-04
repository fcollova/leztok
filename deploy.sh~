#!/bin/bash
# Git command and Deploy


git add --all .
git commit -m "$1"
git push origin master

if ["$2" == "d"]; then
    	echo ">> Deployng to Heroku"
	git push heroku master
fi
 
