class Word < ActiveRecord::Base
  validates :content, :word_type, :description, presence: true
end
