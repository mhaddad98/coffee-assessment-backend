import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize/types/sequelize";
import { v4 } from "uuid";

export enum GrindSize {
  Coarse = "coarse",
  Medium = "medium",
  Fine = "fine",
}

export enum BrewMethod {
  FrenchPress = "french-press",
  PourOver = "pour-over",
  Espresso = "espresso",
}

export enum ServingSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export default function OrderModel(sequelize: Sequelize) {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => v4(),
      },
      beanType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grindSize: {
        type: DataTypes.ENUM(...Object.values(GrindSize)),
        allowNull: false,
      },
      waterTemperature: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brewMethod: {
        type: DataTypes.ENUM(...Object.values(BrewMethod)),
        allowNull: false,
      },
      brewTimeInSeconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      servingSize: {
        type: DataTypes.ENUM(...Object.values(ServingSize)),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Order;
}

export interface Order {
  id: string;
  beanType: string;
  grindSize: GrindSize;
  waterTemperature: number;
  brewMethod: BrewMethod;
  brewTimeInSeconds: number;
  servingSize: ServingSize;
}
