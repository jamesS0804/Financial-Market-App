class RenameNameColInUnits < ActiveRecord::Migration[7.0]
  def change
    rename_column :units, :name, :company_name
  end
end
