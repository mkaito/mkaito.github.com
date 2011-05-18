# -*- coding: utf-8 -*-
require 'date'
require 'erb'

class String
  def underscore
    self.dup.to_s.gsub(/::/, '/').
      gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
      gsub(/([a-z\d])([A-Z])/,'\1_\2').
      squeeze.tr("_", "-").
      downcase
  end
  def slug
    str = self.dup
    accents = { 
      ['á','à','â','ä','ã'] => 'a',
      ['Ã','Ä','Â','À','�?'] => 'A',
      ['é','è','ê','ë'] => 'e',
      ['Ë','É','È','Ê'] => 'E',
      ['í','ì','î','ï'] => 'i',
      ['�?','Î','Ì','�?'] => 'I',
      ['ó','ò','ô','ö','õ'] => 'o',
      ['Õ','Ö','Ô','Ò','Ó'] => 'O',
      ['ú','ù','û','ü'] => 'u',
      ['Ú','Û','Ù','Ü'] => 'U',
      ['ç'] => 'c', ['Ç'] => 'C',
      ['ñ'] => 'n', ['Ñ'] => 'N'
    }
    accents.each do |ac,rep|
      ac.each do |s|
        str = str.gsub(s, rep)
      end
    end
    str = str.gsub(/[^a-zA-Z0-9 ]/,"")
    
    str = str.strip.gsub(/\s+/," ")
    

    str = str.gsub(/\s/,"-")
    
    str = str.downcase

  end
end

namespace :article do
  desc "Create a new blog post draft"
  task :new, [:title, :link] do |t, args|
    args.with_defaults(:link => false)
    unless args.title
      puts 'Please provide a title:'
      puts '    rake "article:new[<title>]"'
      exit 1
    end

    base_path = File.expand_path "~/dev/blog"
    posts_path = File.join base_path, "_posts"
    drafts_path = File.join base_path, "_drafts"

    title = args.title.chomp.strip.gsub /\s+/, " "
    date = Date.today
    slug = title.slug
    file_name = "#{slug}.mkd"
    full_path = File.join drafts_path, file_name
    
    unless File.exists?(full_path)
      puts "Creating file: #{full_path}"
      f = File.open(full_path, "w")
      template = ERB.new <<-EOF.gsub(/^\s{2,}/, '')
      ---
      title: #{title}
      meta: &mdash;
      byline: 
      layout: post
      published: false
      ---
      EOF
      f << template.result(binding)
      f.close
      system "$EDITOR #{full_path}"
    else
      puts "File already exists!"
      exit 1
    end

  end
end
