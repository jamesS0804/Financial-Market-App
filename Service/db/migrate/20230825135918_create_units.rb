class CreateUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :units do |t|
      t.string :symbol 
      t.string :name
      t.string :exchange

      t.timestamps
    end
  end
end
