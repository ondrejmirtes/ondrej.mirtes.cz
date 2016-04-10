# from https://stackoverflow.com/questions/28154953/in-jekyll-how-to-set-default-tab-size-in-highlighted-code
class Jekyll::Tags::HighlightBlock
  old_sanitized_opts = instance_method(:sanitized_opts)

  define_method(:sanitized_opts) do |*args|
    old_sanitized_opts.bind(self).(*args).
      merge(Jekyll.configuration.fetch("pygments_options", {}))
  end
end
