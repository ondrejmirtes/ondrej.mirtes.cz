# encoding: utf-8

# From: https://github.com/shigeya/jekyll-monthly-archive-plugin

module Jekyll

  # Generator class invoked from Jekyll
  class YearlyArchiveGenerator < Generator
    def generate(site)
      posts_group_by_year(site).each do |year, list|
      	page = YearlyArchivePage.new(site, archive_base(site),
                                             year, list)
        site.pages << page
        site.data['archives'] ||= []
        site.data['archives'] << page
      end
    end

    def posts_group_by_year(site)
      homepage_limit = site.config['homepage_limit']
      site.posts
      	.reverse
      	.slice(homepage_limit, site.posts.length)
      	.reverse
      	.each.group_by { |post| post.date.year > 2011 ? post.date.year : 'Starší' }
    end

    def archive_base(site)
      site.config['yearly_archive'] && site.config['yearly_archive']['path'] || ''
    end
  end

  # Actual page instances
  class YearlyArchivePage < Page

    ATTRIBUTES_FOR_LIQUID = %w[
      year,
      date,
      content,
      url
    ]

    def initialize(site, dir, year, posts)
      @site = site
      @dir = dir
      @year = year
      @archive_dir_name = year.to_s.to_slug
      @date = @year != 'Starší' ? Date.new(@year) : nil
      @layout = site.config['yearly_archive'] && site.config['yearly_archive']['layout'] || 'yearly_archive'
      @url = '/%s/%s/' % [@dir, @archive_dir_name]
      self.ext = '.html'
      self.basename = 'index'
      title_short = @date == nil ? @year : ('Rok %s' % [year])
      self.data = {
          'layout' => @layout,
          'type' => 'archive',
          'title' => "Archiv - %s" % [title_short],
          'title_short' => title_short,
          'posts' => posts.reverse,
          'year' => year,
      }
    end

    def render(layouts, site_payload)
      payload = {
          'page' => self.to_liquid,
          'paginator' => pager.to_liquid
      }
      payload = Utils.deep_merge_hashes(payload, site_payload)
      do_layout(payload, layouts)
    end

    def to_liquid(attr = nil)
      self.data = Utils.deep_merge_hashes(self.data, {
           'content' => self.content,
           'date' => @date,
           'year' => @year,
           'url' => @url
      })
    end

    def destination(dest)
      File.join('/', dest, @dir, @archive_dir_name, 'index.html')
    end

  end
end

# The MIT License (MIT)
#
# Copyright (c) 2013 Shigeya Suzuki
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.