class CreateWordsTable < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :content
      t.string :word_type
      t.string :description
      t.integer :lession_id
      t.timestamps
    end
  end
end
