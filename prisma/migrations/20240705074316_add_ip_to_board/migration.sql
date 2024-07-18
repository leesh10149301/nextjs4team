-- CreateTable
CREATE TABLE "board" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT DEFAULT '',
    "content" TEXT DEFAULT '',
    "likes" INTEGER,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);
