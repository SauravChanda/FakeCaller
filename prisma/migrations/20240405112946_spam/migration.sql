-- CreateTable
CREATE TABLE "Spam" (
    "phoneNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spam_pkey" PRIMARY KEY ("userId","phoneNumber")
);

-- AddForeignKey
ALTER TABLE "Spam" ADD CONSTRAINT "Spam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
