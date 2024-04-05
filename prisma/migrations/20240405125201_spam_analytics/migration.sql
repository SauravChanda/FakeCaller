-- CreateTable
CREATE TABLE "SpamAnalitics" (
    "phoneNumber" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "SpamAnalitics_pkey" PRIMARY KEY ("phoneNumber")
);
