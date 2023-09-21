/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - The `id` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_ordersToproducts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `barcode` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costPrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fees` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `markup` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profitAmount` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasePrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityInStock` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reorderLevel` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCost` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxes` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ordersToproducts" DROP CONSTRAINT "_ordersToproducts_B_fkey";

-- AlterTable
ALTER TABLE "_ordersToproducts" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
DROP COLUMN "price",
DROP COLUMN "quantity",
ADD COLUMN     "barcode" TEXT NOT NULL,
ADD COLUMN     "costPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fees" JSONB NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "manufacturer" TEXT NOT NULL,
ADD COLUMN     "markup" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "profitAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "purchasePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantityInStock" INTEGER NOT NULL,
ADD COLUMN     "reorderLevel" INTEGER NOT NULL,
ADD COLUMN     "sellingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shippingCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "supplier" TEXT NOT NULL,
ADD COLUMN     "taxes" JSONB NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ordersToproducts_AB_unique" ON "_ordersToproducts"("A", "B");

-- CreateIndex
CREATE INDEX "_ordersToproducts_B_index" ON "_ordersToproducts"("B");

-- AddForeignKey
ALTER TABLE "_ordersToproducts" ADD CONSTRAINT "_ordersToproducts_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
