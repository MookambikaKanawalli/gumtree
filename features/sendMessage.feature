Feature: Buyer to send message to the seller of the ad

    @e2e
    Scenario Outline: Login to SWX as registered user
        Given Dan as a buyer is on gumtree "1266454340" page
        And he sends the message "<message>" to the seller of the ad
        And he navigates to next page
        Examples:
            | message                                                                               |
            | Hey I’m interested in this item. Could you share what’s the colour of the bag please? |