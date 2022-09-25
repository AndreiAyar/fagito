-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroceriesToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_GroceriesToPost_AB_unique" ON "_GroceriesToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_GroceriesToPost_B_index" ON "_GroceriesToPost"("B");

-- AddForeignKey
ALTER TABLE "_GroceriesToPost" ADD CONSTRAINT "_GroceriesToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Groceries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroceriesToPost" ADD CONSTRAINT "_GroceriesToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
