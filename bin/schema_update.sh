#!/bin/sh -x

bundle exec ridgepole -c config/database.yml -E development -f db/ridgepole.rb --apply
#bundle exec annotate
