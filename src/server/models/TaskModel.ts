import { DataTypes, Sequelize } from "sequelize";
import { v4 } from "uuid";
export default function TaskModel(sequelize: Sequelize) {
  return sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => v4(),
      },
      taskType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      workflowId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("started", "finished", "failed"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
}
