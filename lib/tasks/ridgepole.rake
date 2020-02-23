namespace :ridgepole do
  desc "Exec Apply Dry Run"
  task apply_dry_run: :environment do
    exec "bundle exec ridgepole -c config/database.for.heroku.ridgepole.yml -E #{Rails.env} -f #{Rails.root}/db/ridgepole.rb --apply --dry-run"
  end

  desc "Exec Apply"
  task apply: :environment do
    exec "bundle exec ridgepole -c config/database.for.heroku.ridgepole.yml -E #{Rails.env} -f #{Rails.root}/db/ridgepole.rb --apply"
  end

  desc "Exec Export Schemafile"
  task export: :environment do
    exec "bundle exec ridgepole -c config/database.for.heroku.ridgepole.yml -E #{Rails.env} --export -o db/ridgepole.rb"
  end
end
