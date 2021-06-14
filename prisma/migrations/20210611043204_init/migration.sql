-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserHome" (
    "userId" TEXT NOT NULL,
    "addressToken" TEXT NOT NULL,
    "heroImageUrl" TEXT NOT NULL,

    PRIMARY KEY ("userId", "addressToken"),
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ListingEvent" (
    "addressToken" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "ValuationEvent" (
    "date" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "addressToken" TEXT NOT NULL,

    PRIMARY KEY ("date", "addressToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
